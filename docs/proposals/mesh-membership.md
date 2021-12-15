# Mesh Membership

## Context

Right now, on Kubernetes you can change Mesh of Dataplane with `kuma.io/mesh` annotation on Pod.
This raises a problem of how we can restrict service owners of changing mesh of their services.

## Requirements

* Mesh operator can define which Dataplanes (Pods) can join defined Mesh
* Mesh operator can define Namespaces in which Pods can join defined Mesh
* Service owner can switch a Pod between two allowed Meshes (in case of migration)

## Configuration

There are several options how we could introduce this configuration

### Option 1 - Explicit Kubernetes field

```yaml
type: Mesh
name: demo
mtls:
  ...
dataplaneProxyMembership:
  allowed:
  - kubernetes:
      namespace:
        name: ns-1
  - kubernetes:
      namespace:
        name: ns-2
      zone: east 
  - kubernetes:  
      namespace:
        name: ns-3
      pod:
        labels:
          xyz: abc
  - kubernetes:
      namespace:
        labels:
          xyz: abc
```

This means that:
* all Pods in Namespace `ns-1` can join the `demo` Mesh.
* all Pods in Namespace `ns-2` in Zone east can join the `demo` Mesh.
  This way we can prevent `ns-2` from other zones to join.
* all Pods with labels `xyz: abc` in namespace `ns-2` can also join the `demo` Mesh.
* all Pods in namespaces with labels `xyz: abc` can also join the `demo` Mesh.

I don't see strong reasons to introduce support for third and fourth case *at this moment*.
Especially that it is a security feature and it's hard to restrict placing labels in Kubernetes.
Therefore, the initial implementation would cover the first and the second case. We can add others on demand.

Assuming that the mesh operator allows Pod x to join the `demo` Mesh, a service owner can now place `kuma.io/mesh: demo` on their Pods (via `Deployment#template`).

## Option 2 - tags

Since last release, we autogenerate `k8s.kuma.io/namespace` tag. Therefore, we can implement the same logic with just tags

```yaml
type: Mesh
name: demo
mtls:
  ...
dataplaneProxyMembership:
  allowed:
  - tags:
      k8s.kuma.io/namespace: ns-1
  - tags:
      k8s.kuma.io/namespace: ns-2
      kuma.io/zone: east
  - tags:
      k8s.kuma.io/namespace: ns-3
      xyz: abc
  # no equivalent of the fourth rule
```

This mechanism can then be potentially reused in other context than Kubernetes. For example:
* Other orchestrators in which we would autogenerate Dataplane proxies (ECS).
* This could be a way to standardize mesh deployment and force service owners to define common tags.
  When `team: *` is defined, only data plane proxies with defined `team` tag can join.

The only problem here is what if we have Mesh that spans across Kubernetes and Universal cluster.
Let's say we have a zone `vms-1` and `vms-2` that are Universal.
The configuration above requires `k8s.kuma.io/namespace` which is not present on Universal clusters.

To support this case we could list them explicitly
```yaml
allowed:
  - tags:
      kuma.io/zone: vms-1
  - tags:
      kuma.io/zone: vms-2
  - tags:
      k8s.kuma.io/namespace: ns-1
  - tags:
      k8s.kuma.io/namespace: ns-2
      kuma.io/zone: east
  - tags:
      k8s.kuma.io/namespace: ns-3
      xyz: abc
```

Alternatively, we could autogenerate tag `kuma.io/environment` with values `kubernetes` or `universal`.
This way we don't have to explicitly list universal zones
```yaml
allowed:
  - tags:
      kuma.io/environment: universal
  - tags:
      k8s.kuma.io/namespace: ns-1
  - tags:
      k8s.kuma.io/namespace: ns-2
      kuma.io/zone: east
  - tags:
      k8s.kuma.io/namespace: ns-3
      xyz: abc
```

`kuma.io/environment` can be also used in other cases like putting `ProxyTemplate` only on universal proxies etc.
To not "pollute" the set of tags, we can only generate it with multizone deployments.
After all, in standalone mode you can only run one type of the environment.

The advantage of this option is that it works consistently across all deployment models and environments.

In the future we can also add `blocked`, to give mesh operator a tool to remove compromised or bad behaving data plane proxies.

## Backwards compatibility

This feature is backwards compatible. If no `allowed` is specified on the Mesh, any data plane proxy can join.

## Multizone

In Multizone, this is configured on Global CP and synced to Zone CP as a part of Mesh object.
You can select zones with `kuma.io/zone` tags.
