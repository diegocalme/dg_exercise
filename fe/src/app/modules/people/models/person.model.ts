export class PersonModel {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number,
    public readonly address: string,
    public readonly qrcode: string
  ) {}
}
