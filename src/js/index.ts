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
                result += "<li>" + Convert(music) + "</li>"
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
let GetByTitleInput: HTMLInputElement = <HTMLInputElement>document.getElementById("searchTitle");
let GetByTitleOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("SearchTitleContent")
let GetByTitleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchTitleButton")
GetByTitleButton.addEventListener("click", GetByTitle)

function GetByTitle(): void {
    console.log(GetByTitleInput.value)
    axios.get<IMusicRecord>(baseUri + "/" + GetByTitleInput.value)
        .then(function (response: AxiosResponse<IMusicRecord>): void {
            
            GetByTitleOutput.innerHTML = Convert(response.data)

        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                GetByTitleOutput.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                GetByTitleOutput.innerHTML = error.message;
            }
        });

}

function Convert(music: IMusicRecord): string {
    return "Title: " + music.title + " Kunstner: " + music.artist + " længde: " + music.duration + " min Udgivelses år: " + music.yearOfPublication + " antal nummere: " + music.numberOfTracks;
}

let GetByArtistInput : HTMLInputElement = <HTMLInputElement>document.getElementById("searchArtist")
let GetByArtistOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("searchArtistContent")
let GetByArtistButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchArtistButton")
GetByArtistButton.addEventListener("click", GetByArtist)

function GetByArtist(): void {
    console.log(GetByArtistInput.value)
    axios.get<IMusicRecord[]>(baseUri + "/artist/" + GetByArtistInput.value)
    .then(function(response: AxiosResponse<IMusicRecord[]>): void{
        
        let result: string = "<ul>";
        response.data.forEach((music: IMusicRecord) => {
            result += "<li>" + Convert(music) + "</li>"
        });
        result += "</ul>";

        GetByArtistOutput.innerHTML = result;
    })
    .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
        if (error.response) {
            // the request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
            GetByArtistOutput.innerHTML = error.message;
        } else { // something went wrong in the .then block?
            GetByArtistOutput.innerHTML = error.message;
        }
    });
}

let AddTitleInput : HTMLInputElement = <HTMLInputElement>document.getElementById("addTitle")
let AddArtistInput : HTMLInputElement = <HTMLInputElement>document.getElementById("addArtist")
let AddDurationInput : HTMLInputElement = <HTMLInputElement>document.getElementById("addDuration")
let AddPublicationYearInput : HTMLInputElement = <HTMLInputElement>document.getElementById("addPublicationYear")
let AddTracksInput : HTMLInputElement = <HTMLInputElement>document.getElementById("addTracks")
let AddButtonInput : HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton")
let AddContentOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("addContent")
AddButtonInput.addEventListener("click", AddMusic)

function AddMusic(): void {
    console.log(AddTitleInput.value)
    axios.post(baseUri, {title: AddTitleInput.value, artist: AddArtistInput.value, 
        duration: AddDurationInput.value, yearOfPublication:AddPublicationYearInput.value, 
        numberOfTracks: AddTracksInput.value})
        .then((response: AxiosResponse)=>{AddContentOutput.innerHTML = response.status + " " + response.statusText})
        .catch((error: AxiosError) => {AddContentOutput.innerHTML = error.message});
}

let DeleteInput : HTMLInputElement = <HTMLInputElement>document.getElementById("deleteTitle")
let DeleteOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("deleteOutput")
let DeleteButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton")
DeleteButton.addEventListener("click", DeleteMusic)

function DeleteMusic(): void {
    console.log(DeleteInput.value)
    axios.delete(baseUri + "/" + DeleteInput.value)
    .then(function((response: AxiosResponse) => {DeleteOutput.innerHTML = response.status + " " + response.statusText}))
}