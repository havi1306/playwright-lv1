import { PersonRepository } from "./services/PersonRepository";

async function main() {
    const jsonPath = "./data/people.json"
    const outputPath = "./data/people_out.json"
    const repo = new PersonRepository()
    const persons = await repo.readPersonsFromJSON(jsonPath)

    persons.forEach(person => {
        person.celebrateBirthaday()
        console.log(person.great())
        console.log(`Is adult: ${person.isAdult()}`)
    })
    await repo.savePersonsToJSON(persons, outputPath)
}
main()