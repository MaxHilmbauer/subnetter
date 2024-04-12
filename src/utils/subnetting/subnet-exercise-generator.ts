import { SubnettingExercise, Subnet, SubnettingExerciseType, IPAddress, SubnetMask } from '@/types/subnetting';
import { generateRandomIPAddress } from './ip-service';
import { convertCIDRSubnetMask, generateRandomSubnetMask } from './subnet-mask-service';
import { convertSubnet, loadNextSubnet } from './subnet-service';

function generateRandomSubnet(): Subnet {
  const ipAddress: IPAddress = generateRandomIPAddress();
  const subnetMask: SubnetMask = generateRandomSubnetMask();

  return convertSubnet(ipAddress, subnetMask);
}

function nextPowerOfTwo(n: number): number {
  let power = 1;
  while (power < n) {
      power *= 2;
  }
  return power;
}

function generateHostCountExercise(subnet: Subnet): SubnettingExercise {
  const hostCount: number = Math.floor(Math.random() * (30 - subnet.mask.cidr + 1)) + subnet.mask.cidr + 1;
  const subnetCount: number = subnet.addresses / nextPowerOfTwo(hostCount);
  const subnetMask: SubnetMask = convertCIDRSubnetMask(Math.log2(subnetCount) + subnet.mask.cidr);
  const subnets: Subnet[] = [convertSubnet(subnet.networkIP, subnetMask)];
  
  for (var i = 1; i < subnetCount; i++) {
    subnets.push(loadNextSubnet(subnets[i - 1]));
  }

  return {
    exerciseType: SubnettingExerciseType.HOST_COUNT_EXERCISE,
    subnet,
    hostCount,
    subnetCount,
    subnetMask,
    subnets: subnets
  };
}

function generateSubnetCountExercise(subnet: Subnet): SubnettingExercise {
  const newSubnetCount = Math.floor(Math.random() * 16) + 1;

  const subnettingExercise: SubnettingExercise = {
    exerciseType: SubnettingExerciseType.SUBNET_COUNT_EXERCISE,
    subnet,
    hostCount: 0,
    subnetCount: 0,
    subnetMask: {} as SubnetMask,
    subnets: []
  }

  return subnettingExercise;
}

function generateSubnetMaskExercise(subnet: Subnet): SubnettingExercise {
  const newMask = Math.floor(Math.random() * 24) + 8;

  const subnettingExercise: SubnettingExercise = {
    exerciseType: SubnettingExerciseType.SUBNET_MASK_EXERCISE,
    subnet,
    hostCount: 0,
    subnetCount: 0,
    subnetMask: {} as SubnetMask,
    subnets: []
  }

  return subnettingExercise;
}

function getRandomExerciseType(): SubnettingExerciseType {
  const index= Math.floor(Math.random() * Object.keys(SubnettingExerciseType).length);
  const value = Object.values(SubnettingExerciseType)[index];

  return SubnettingExerciseType[value];
}

export function generateSubnettingExercise(): SubnettingExercise {
  console.log('Yee');
  const subnet: Subnet = generateRandomSubnet();
  console.log(subnet.networkIP.address + "/" + subnet.mask.cidr);
  

  return generateHostCountExercise(subnet);

  /*switch (exerciseType) {
    case SubnettingExerciseType.HOST_COUNT_EXERCISE:
    case SubnettingExerciseType.SUBNET_COUNT_EXERCISE:
      return generateSubnetCountExercise(subnet);
    case SubnettingExerciseType.SUBNET_MASK_EXERCISE:
      return generateSubnetMaskExercise(subnet);
  }*/
}