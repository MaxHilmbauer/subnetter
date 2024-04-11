export interface IPAddress {
  address: string;
  addressNumbers: number[];
  addressBinary: string;
}

export interface SubnetMask {
  cidr: number;
  mask: string;
  maskNumbers: number[];
  maskBinary: string;
}

export interface Subnet {
  networkIP: IPAddress,
  mask: SubnetMask;
  firstHostIP: IPAddress;
  lastHostIP: IPAddress;
  broadcastIP: IPAddress;
  addresses: number
  hosts: number;
}

export interface SubnettingExercise {
  subnet: Subnet;
  hostCount: number;
  subnetCount: number;
  subnetMask: SubnetMask;
  subnets: Subnet[];
}

export enum SubnettingExerciseType {
  HOST_COUNT_EXERCISE = 'HOST_COUNT_EXERCISE',
  SUBNET_COUNT_EXERCISE = 'SUBNET_COUNT_EXERCISE',
  SUBNET_MASK_EXERCISE = 'SUBNET_MASK_EXERCISE',
}