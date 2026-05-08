export type ProfileAddress = {
  id: string;
  fullName: string;
  mobile: string;
  line1: string;
  line2: string;
  landmark: string;
  townCity: string;
  state: string;
  pinCode: string;
  saveAs: string;
};

export function createAddressId(): string {
  return `addr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}
