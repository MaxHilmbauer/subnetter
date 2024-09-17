import { IPAddress, Subnet, SubnetMask } from "@/types/subnetting";
import { convertBinaryIP, loadNextIPAddress } from "./ip-service";

export function getSubnet(
  ipAddress: IPAddress,
  subnetMask: SubnetMask
): Subnet {
  const networkIP: IPAddress = convertBinaryIP(
    ipAddress.addressBinary
      .split("")
      .map((bit, index) => {
        if (subnetMask.maskBinary[index] === "1") {
          return bit;
        } else if (subnetMask.maskBinary[index] === "0") {
          return "0";
        }
      })
      .join("")
  );
  const broadcastIP: IPAddress = convertBinaryIP(
    networkIP.addressBinary
      .split("")
      .map((bit, index) => {
        if (subnetMask.maskBinary[index] === "1") {
          return bit;
        } else if (subnetMask.maskBinary[index] === "0") {
          return "1";
        }
      })
      .join("")
  );

  const firstHostIP: IPAddress = convertBinaryIP(
    networkIP.addressBinary.slice(0, 31) + "1"
  );
  const lastHostIP: IPAddress = convertBinaryIP(
    broadcastIP.addressBinary.slice(0, 31) + "0"
  );

  return {
    networkIP: networkIP,
    mask: subnetMask,
    firstHostIP: firstHostIP,
    lastHostIP: lastHostIP,
    broadcastIP: broadcastIP,
    addresses: Math.pow(2, 32 - subnetMask.cidr),
    hosts: Math.pow(2, 32 - subnetMask.cidr) - 2,
  };
}

export function loadNextSubnet(subnet: Subnet): Subnet {
  const nextNetworkIP = loadNextIPAddress(subnet.broadcastIP);

  return getSubnet(nextNetworkIP, subnet.mask);
}
