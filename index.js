import fs from "fs"
import { parse } from "fast-csv"

const filePath = "cereal.csv"

let csvArray = { data: []}
let headers
let index = 0

fs.createReadStream(filePath)
    .pipe(parse())
    .on("error", error => console.error(error))
    .on("data", (row) => {
      if (index === 0) {
        headers = [ ...row ]
      }
      else {
        let rowObject = {}
        for (let i = 0; i < row.length; i++) {
          rowObject[headers[i]] = row[i]
        }
        csvArray.data.push(rowObject)
      }
      index++
    }
    )
    .on("end", (rowCount) => {
      console.log(`$${rowCount} charged to your credit card.`)
      fs.writeFileSync(`${filePath.split(".")[0]}.json`, JSON.stringify(csvArray))
    })