package universal_test

import (
	"testing"

	"github.com/kumahq/kuma/pkg/test"
	"github.com/kumahq/kuma/test/e2e/faultinjection/universal"
	. "github.com/onsi/ginkgo/v2"
)

func TestE2E(t *testing.T) {
	test.RunSpecs(t, "E2E Fault Injection Universal Suite")
}

var _ = Describe("Test Fault Injection on Universal with External Service", universal.ExternalService)
