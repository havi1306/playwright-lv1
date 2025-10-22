import fs from 'fs'
import { Person } from '../Person'

export class PersonRepository {

    async readPersonsFromJSON(jsonPath: string): Promise<Person[]> {
        try {
            const data = await fs.promises.readFile(jsonPath, 'utf8')
            try {
                const jsonData = JSON.parse(data)
                return jsonData.map((item: any) => Person.fromJSON(item))
            } catch (error) {
                throw new Error('Invalid JSON format in the file')
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error('Invalid JSON format in the file')
            }
            throw error
        }
    }

    async savePersonsToJSON(persons: Person[], outputPath: string): Promise<void> {
        try {
            const jsonData = JSON.stringify(persons.map(person => person.toJSON()), null, 2)
            await fs.promises.writeFile(outputPath, jsonData, 'utf8')
        } catch (error) {
            throw new Error(`Failed to save persons: ${(error as Error).message}`)
        }
    }
}