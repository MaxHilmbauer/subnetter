import { SubnettingExercise, Subnet, SubnettingExerciseType } from '@/types/subnetting';

function generateRandomSubnet(): Subnet {
  const ipAddress = Array.from({ length: 4 }, () => Math.floor(Math.random() * 254) + 1).join('.');

  const mask = Math.floor(Math.random() * 24) + 8;
  const maskBinary = '1'.repeat(mask).padEnd(32, '0');

  const ipBinary = ipAddress.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');

  const networkBinary = ipBinary.split('').map((bit, index) => (bit === '1' && maskBinary[index] === '1') ? '1' : '0').join('');

  const network = [
    parseInt(networkBinary.substring(0, 8), 2),
    parseInt(networkBinary.substring(8, 8), 2),
    parseInt(networkBinary.substring(16, 8), 2),
    parseInt(networkBinary.substring(24, 8), 2)
  ].join('.');

  const firstHostBinary = networkBinary.substring(0, 31) + '1';
  const firstHost = [
    parseInt(firstHostBinary.substring(0, 8), 2),
    parseInt(firstHostBinary.substring(8, 8), 2),
    parseInt(firstHostBinary.substring(16, 8), 2),
    parseInt(firstHostBinary.substring(24, 8), 2)
  ].join('.');

  const lastHostBinary = networkBinary.substring(0, 31) + '0'.repeat(31 - mask) + '1';
  const lastHost = [
    parseInt(lastHostBinary.substring(0, 8), 2),
    parseInt(lastHostBinary.substring(8, 8), 2),
    parseInt(lastHostBinary.substring(16, 8), 2),
    parseInt(lastHostBinary.substring(24, 8), 2)
  ].join('.');

  const broadcastBinary = networkBinary.substring(0, 31) + '1'.repeat(32 - mask);
  const broadcast = [
    parseInt(broadcastBinary.substring(0, 8), 2),
    parseInt(broadcastBinary.substring(8, 8), 2),
    parseInt(broadcastBinary.substring(16, 8), 2),
    parseInt(broadcastBinary.substring(24, 8), 2)
  ].join('.');

  const hosts = Math.pow(2, 32 - mask) - 2; 
  const addresses = hosts + 2;

  return {
    network,
    networkBinary,
    mask,
    maskBinary,
    firstHost,
    firstHostBinary,
    lastHost,
    lastHostBinary,
    broadcast,
    broadcastBinary,
    addresses,
    hosts
  };
}

function getRandomExerciseType(): SubnettingExerciseType {
  const index= Math.floor(Math.random() * Object.keys(SubnettingExerciseType).length);
  const value = Object.values(SubnettingExerciseType)[index];

  return SubnettingExerciseType[value];
}

function generateHostCountExercise(subnet: Subnet): SubnettingExercise {
  const subnettingExercise: SubnettingExercise = {
    subnet: subnet,
    hostCount: 0,
    subnetCount: 0,
    mask: 0,
    subnets: []
  }
  
  subnettingExercise.hostCount = Math.floor(Math.random() * subnet.addresses) + 1;
  subnettingExercise.subnetCount = subnet.addresses / subnettingExercise.hostCount + 2;
  subnettingExercise.mask = Math.log2(subnettingExercise.subnetCount) + subnet.mask;

  return subnettingExercise;
}

function generateSubnetCountExercise(subnet: Subnet): SubnettingExercise {
  const newSubnetCount = Math.floor(Math.random() * 16) + 1;

  const subnettingExercise: SubnettingExercise = {
    subnet: subnet,
    hostCount: 0,
    subnetCount: 0,
    mask: 0,
    subnets: []
  }

  return subnettingExercise;
}

function generateSubnetMaskExercise(subnet: Subnet): SubnettingExercise {
  const newMask = Math.floor(Math.random() * 24) + 8;

  const subnettingExercise: SubnettingExercise = {
    subnet: subnet,
    hostCount: 0,
    subnetCount: 0,
    mask: 0,
    subnets: []
  }

  return subnettingExercise;
}








export function generateSubnettingExercise(): SubnettingExercise {
  
  const subnet: Subnet = generateRandomSubnet();
  const exerciseType = getRandomExerciseType();

  return generateHostCountExercise(subnet);

  switch (exerciseType) {
    case SubnettingExerciseType.HOST_COUNT_EXERCISE:
    case SubnettingExerciseType.SUBNET_COUNT_EXERCISE:
      return generateSubnetCountExercise(subnet);
    case SubnettingExerciseType.SUBNET_MASK_EXERCISE:
      return generateSubnetMaskExercise(subnet);
  }
}