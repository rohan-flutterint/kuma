package topology

import (
	mesh_proto "github.com/Kong/kuma/api/mesh/v1alpha1"
	mesh_core "github.com/Kong/kuma/pkg/core/resources/apis/mesh"
	core_xds "github.com/Kong/kuma/pkg/core/xds"
)

// GetOutboundTargets resolves all endpoints reachable from a given dataplane.
func GetOutboundTargets(destinations core_xds.DestinationMap, dataplanes *mesh_core.DataplaneResourceList) (core_xds.EndpointMap, error) {
	if len(destinations) == 0 {
		return nil, nil
	}
	return BuildEndpointMap(destinations, dataplanes.Items), nil
}

// BuildEndpointMap creates a map of all endpoints that match given selectors.
func BuildEndpointMap(destinations core_xds.DestinationMap, dataplanes []*mesh_core.DataplaneResource) core_xds.EndpointMap {
	if len(destinations) == 0 {
		return nil
	}
	outbound := core_xds.EndpointMap{}
	for _, dataplane := range dataplanes {
		for _, inbound := range dataplane.Spec.Networking.GetInbound() {
			service := inbound.Tags[mesh_proto.ServiceTag]
			selectors, ok := destinations[service]
			if !ok {
				continue
			}
			matches := false
			for _, selector := range selectors {
				if selector.Matches(inbound.Tags) {
					matches = true
					break
				}
			}
			if !matches {
				continue
			}
			iface, err := dataplane.Spec.Networking.ToInboundInterface(inbound)
			if err != nil {
				// skip dataplanes with invalid configuration
				continue
			}
			// TODO(yskopets): do we need to dedup?
			// TODO(yskopets): sort ?
			outbound[service] = append(outbound[service], core_xds.Endpoint{
				Target: iface.DataplaneIP,
				Port:   iface.DataplanePort,
				Tags:   inbound.Tags,
			})
		}
	}
	return outbound
}
