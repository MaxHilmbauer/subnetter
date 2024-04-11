import { SubnetMask } from "@/types/subnetting";
import { convertBinaryOctet, splitIntoOctets } from "./ip-service";

export function generateRandomSubnetMask(): SubnetMask {
  const cidr = Math.floor(Math.random() * 24) + 8;
  const maskBinary = Array.from({ length: 32 }, (_, index) => index < cidr ? '1' : '0').join('');
  const maskNumbers = splitIntoOctets(maskBinary).map(octet => convertBinaryOctet(octet));
  const mask = maskNumbers.join('.');

  return {
    cidr,
    mask,
    maskNumbers,
    maskBinary
  };
}

export function convertCIDRSubnetMask(cidr: number): SubnetMask {
  const maskBinary = Array.from({ length: 32 }, (_, index) => index < cidr ? '1' : '0').join('');
  const maskNumbers = splitIntoOctets(maskBinary).map(octet => convertBinaryOctet(octet));
  const mask = maskNumbers.join('.');

  return {
    cidr,
    mask,
    maskNumbers,
    maskBinary
  };
}

export function convertDecimalSubnetMask(mask: string): SubnetMask {
  const maskNumbers = mask.split('.').map(octet => parseInt(octet));
  const maskBinary = maskNumbers.map(octet => octet.toString(2).padStart(8, '0')).join('');
  const cidr = maskBinary.split('').filter(bit => bit === '1').length;

  return {
    cidr,
    mask,
    maskNumbers,
    maskBinary
  };
}

export function convertDecimalBinarySubnetMask(maskNumbers: number[]): SubnetMask {
  const maskBinary = maskNumbers.map(octet => octet.toString(2).padStart(8, '0')).join('');
  const cidr = maskBinary.split('').filter(bit => bit === '1').length;
  const mask = maskNumbers.join('.');

  return {
    cidr,
    mask,
    maskNumbers,
    maskBinary
  };

}

export function convertBinarySubnetMask(maskBinary: string): SubnetMask {
  const maskNumbers = splitIntoOctets(maskBinary).map(octet => convertBinaryOctet(octet));
  const cidr = maskBinary.split('').filter(bit => bit === '1').length;
  const mask = maskNumbers.join('.');


  return {
    cidr,
    mask,
    maskNumbers,
    maskBinary
  };
}