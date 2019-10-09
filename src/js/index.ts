import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IMusicRecord {
    title: string;
    artist: string;
    duration: string;
    yearOfPublication: string;
    numberOfTracks: string;
}
let baseUri: string = "http://localhost:64665/api/MusicRecords";
let GetAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("GetAll");
let GetAllOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("contentGetAll");

GetAllButton.addEventListener("click", GetAll)

function GetAll(): void {
    console.log("so far")
    axios.get<IMusicRecord[]>(baseUri)
        .then(function (response: AxiosResponse<IMusicRecord[]>): void {
            let result: string = "<ul>";
            response.data.forEach((music: IMusicRecord) => {
                result += "<li> Title: " + music.title + " Kunstner: " + music.artist + " længde: " + music.duration + " min Udgivelses år: " + music.yearOfPublication + " antal nummere: " + music.numberOfTracks + "</li>"
            });
            result += "</ul>";
            GetAllOutput.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                GetAllOutput.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                GetAllOutput.innerHTML = error.message;
            }
        });
}