import { ImageSource } from "@nativescript/core";
import { pm_list } from "~/stores/mail_list";
import fs from "./fs";
import server from "./server";

export function get_image_source_or_download_from_server(file_path: string){
    if (fs.file_exists(file_path)){
        // console.log("file ", fs.output_path+file_path)
        return fs.output_path + file_path;
    } else {
        download_and_save_image(file_path);
        // console.log("server", file_path);
        return server.get_image(file_path);
    }
}

const loading_set = new Set();

async function download_and_save_image(file_path){
    if(loading_set.has(file_path)){
        return;
    }

    loading_set.add(file_path);
    const img = await ImageSource.fromUrl(server.get_image(file_path))
    // console.log("save img", file_path)
    try {
        const folder_path = fs.get_folder_path(file_path);
        fs.create_folder_if_not_exist(folder_path);

        const image_type = fs.get_file_type(file_path)
        if(image_type == "jpg" || image_type == "jpeg" || image_type == "png"){
            console.log("downloaded ", file_path);
            img.saveToFile(fs.output_path + file_path, image_type)
        }        
    } catch (e) {
        console.log(e)
    }
}

let $pm_list;
pm_list.subscribe(v=>{
    $pm_list = v;
})

export async function download_all_image(){
    const image_list = $pm_list.map(pm=>pm.images).flat();
    const page_length = 20;

    for(let i = 0; i < 400; i += page_length){
        const promise_list = image_list.slice(i, Math.min(i+page_length, image_list.length))
            .filter(img => ! fs.file_exists("/" + img))
            .map(img => download_and_save_image("/" + img));

        await Promise.all(promise_list);
        console.log("\n ", i+page_length, "개 다운로드 완료" ," \n")
    }
}