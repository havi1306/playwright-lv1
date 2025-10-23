export class Person {
    private name: string
    private age: number
    private city: string

    constructor(name: string, age: number, city: string) {
        if (!name || name.trim() === "") {
            throw new Error("Name is not empty");
        }
        this.name = name
        if (age <= 0) {
            throw new Error("Age is positive");
        }
        this.age = age
        this.city = city
    }

    greet(): string {
        return `Hi, I'm ${this.name} from ${this.city}.`
    }

    celebrateBirthaday() {
        this.age++
    }

    updateCity(newCity: string) {
        this.city = newCity
    }

    isAdult(): boolean {
        return this.age >= 18
    }

    hasSameCity(other: Person): boolean {
        return other.city === this.city
    }

    getName() {
        return this.name
    }

    getAge() {
        return this.age
    }

    getCity() {
        return this.city
    }

    toJSON(): object {
        return {
            "name": this.name,
            "age": this.age,
            "city": this.city
        }
    }

    static fromJSON(data: any): Person {
        return new Person(data.name, data.age, data.city)
    }
}