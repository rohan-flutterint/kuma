package universal

import (
	"fmt"
	"time"

	config_core "github.com/kumahq/kuma/pkg/config/core"
	. "github.com/kumahq/kuma/test/framework"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func meshMTLSOn(mesh string) string {
	return fmt.Sprintf(`
type: Mesh
name: %s
mtls:
  enabledBackend: ca-1
  backends:
  - name: ca-1
    type: builtin
`, mesh)
}

func ExternalServerUniversal(name string) InstallFunc {
	return func(cluster Cluster) error {
		return cluster.DeployApp(
			WithArgs([]string{"test-server", "echo", "--port", "8080", "--instance", name}),
			WithName(name),
			WithoutDataplane(),
			WithVerbose())
	}
}

var externalService1 = `
type: ExternalService
mesh: %s
name: external-service-1
tags:
  kuma.io/service: external-service-1
  kuma.io/protocol: http
networking:
  address: es-test-server.default.svc.cluster.local:80`
  //address: httpbin.org:80`


func ExternalService1(mesh string) string {
	return fmt.Sprintf(externalService1, mesh)
}

func ExternalService() {

	var global, universalZone *UniversalCluster

	BeforeEach(func() {
		universalClusters, err := NewUniversalClusters(
			[]string{Kuma4, Kuma5},
			Silent)
		Expect(err).ToNot(HaveOccurred())

		// Global
		global = universalClusters.GetCluster(Kuma5).(*UniversalCluster)
		Expect(NewClusterSetup().
			Install(Kuma(config_core.Global)).
			Install(YamlUniversal(meshMTLSOn("default"))).
			Install(YamlUniversal(ExternalService1("default"))).
			Setup(global)).To(Succeed())

		demoClientToken, err := global.GetKuma().GenerateDpToken("default", "dp-demo-client")
		Expect(err).ToNot(HaveOccurred())

		egressTokenZone4, err := global.GetKuma().GenerateZoneEgressToken(Kuma4)
		Expect(err).ToNot(HaveOccurred())

		testServerToken, err := global.GetKuma().GenerateDpToken("default", "test-server")
		Expect(err).ToNot(HaveOccurred())

		// Universal Zone
		universalZone = universalClusters.GetCluster(Kuma4).(*UniversalCluster)
		Expect(NewClusterSetup().
			Install(Kuma(config_core.Zone, WithGlobalAddress(global.GetKuma().GetKDSServerAddress()))).
			Install(DemoClientUniversal("dp-demo-client", "default", demoClientToken, WithTransparentProxy(true))).
			Install(TestServerUniversal("test-server", "default", testServerToken, WithArgs([]string{"echo", "--instance", "universal1"}))).
			Install(EgressUniversal(egressTokenZone4)).
			Install(ExternalServerUniversal("es-test-server")).
			Setup(universalZone)).To(Succeed())
	})

	E2EAfterEach(func() {
		Expect(global.DeleteKuma()).To(Succeed())
		Expect(global.DismissCluster()).To(Succeed())

		Expect(universalZone.DeleteKuma()).To(Succeed())
		Expect(universalZone.DismissCluster()).To(Succeed())
	})

	PIt("should inject faults for external service", func() {
		time.Sleep(1 * time.Hour)
	})
}
