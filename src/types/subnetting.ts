export interface Subnet {
  network: string,
  networkBinary: string;
  mask: number;
  maskBinary: string;
  firstHost: string;
  firstHostBinary: string;
  lastHost: string;
  lastHostBinary: string;
  broadcast: string;
  broadcastBinary: string;
  addresses: number
  hosts: number;
}

export interface SubnettingExercise {
  subnet: Subnet;
  hostCount: number;
  subnetCount: number;
  mask: number;
  subnets: Subnet[];
}

export enum SubnettingExerciseType {
  HOST_COUNT_EXERCISE = 'HOST_COUNT_EXERCISE',
  SUBNET_COUNT_EXERCISE = 'SUBNET_COUNT_EXERCISE',
  SUBNET_MASK_EXERCISE = 'SUBNET_MASK_EXERCISE',
}