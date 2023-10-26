import http from "http"
import fs from "fs"
import path from "path"

const PORT = 8000

function startHtmlServer (html) {
    http.createServer((_, response) => {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
    }).listen(PORT, () => {
        console.log(`App running on: ${PORT}`)
    })
}


function main() {

    const htmlPath = path.join(process.cwd(), "server", "html", "index.html")
    
    fs.readFile(htmlPath, (err, html) => {
        if(err) throw err

        startHtmlServer(html)
    })

}


main()