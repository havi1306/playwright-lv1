class Billing {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly companyName?: string;
    readonly streetAddress?: string;
    readonly city?: string;
    readonly phoneNumber?: string;
    readonly emailAddress?: string;

    constructor(firstName?: string, lastName?: string, companyName?: string, streetAddress?: string, city?: string, phoneNumber?: string, emailAddress?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }
}
export { Billing };