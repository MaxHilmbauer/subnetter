import { IPAddress } from "@/types/subnetting";

export function generateRandomIPAddress(): IPAddress {
  const ipAddress = Array.from({ length: 4 }, () => Math.floor(Math.random() * 254) + 1).join('.');  

  return convertStringIP(ipAddress);
}

export function loadNextIPAddress(ipAddress: IPAddress): IPAddress {
    const ipAddressCopy: IPAddress = JSON.parse(JSON.stringify(ipAddress));

    ipAddressCopy.addressNumbers[3]++;

    for (let i = 3; i >= 0; i--) {
        if (ipAddressCopy.addressNumbers[i] > 255) {
          ipAddressCopy.addressNumbers[i] = 0;
          ipAddressCopy.addressNumbers[i - 1]++;
        }
    }

    return convertArrayIP(ipAddressCopy.addressNumbers);
}

export function loadPreviousIPAddress(ipAddress: IPAddress): IPAddress {
  const ipAddressCopy: IPAddress = JSON.parse(JSON.stringify(ipAddress));

    ipAddressCopy.addressNumbers[3]--;

    for (let i = 3; i >= 0; i--) {
        if (ipAddressCopy.addressNumbers[i] < 0) {
            ipAddressCopy.addressNumbers[i] = 255;
          ipAddressCopy.addressNumbers[i - 1]--;
        }
    }

    return convertArrayIP(ipAddressCopy.addressNumbers);
}

export function convertBinaryIP(addressBinary: string): IPAddress {
  const address = splitIntoOctets(addressBinary).map(octet => convertBinaryOctet(octet)).join('.');
  const addressNumbers = address.split('.').map(octet => parseInt(octet));

  return {
    address,
    addressNumbers,
    addressBinary
  };
}

export function convertStringIP(address: string): IPAddress {
  const addressBinary = address.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
  const addressNumbers = address.split('.').map(octet => parseInt(octet));

  return {
    address,
    addressNumbers,
    addressBinary
  };
}

export function convertArrayIP(addressNumbers: number[]): IPAddress {
  const address = addressNumbers.join('.');
  const addressBinary = addressNumbers.map(octet => octet.toString(2).padStart(8, '0')).join('');

  return {
    address,
    addressNumbers,
    addressBinary
  };
}

export function splitIntoOctets(str: string): string[] {
  const octets: string[] = [];

  for (let i = 0; i < str.length; i += 8) {
      const octet = str.slice(i, i + 8);
      octets.push(octet);
  }

  return octets;
}

export function convertBinaryOctet(octet: string): number {
  let sum = 0;
  
  octet.split('').reverse().forEach((bit, index) => {
    sum += parseInt(bit) * Math.pow(2, index);
  });

  return sum
}