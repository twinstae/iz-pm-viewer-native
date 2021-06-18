import { ImageSource } from "@nativescript/core";
import { knownFolders, File, Folder } from "@nativescript/core/file-system";
import {get_member_name} from "~/constants";
// let downloads_path = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
// export const output_path = downloads_path + "/.izpm-viewer/output";

const downloads_path = "/storage/emulated/0/Download/.izpm-viewer";

const output_path = knownFolders.documents().path // downloads_path + "/output";

async function get_json(file_path: string){
  const raw_text = await File.fromPath(output_path + file_path).readText();

  return JSON.parse(raw_text);
}

async function write_json(file_path: string, data: any){
  const json = JSON.stringify(data);

  return File.fromPath(output_path + file_path).writeText(json)
}


async function get_image(file_path: string){
  return ImageSource.fromFile(output_path + file_path);
}

async function write_file(file_path: string, data: any){
  return File.fromPath(output_path + file_path).write(data);
}

async function get_pm_list(): Promise<MailT[]>{
  return get_json("/pm_list.json").then((v: MailT[])=>{
    return v.map((pm)=>({
      ...pm,
      member: get_member_name(pm.member)
    }))
  });
}

function file_exists(file_path: string){
  return File.exists(output_path + file_path);
}

function folder_exists(folder_path: string){
  return Folder.exists(output_path + folder_path);
}

function get_folder_path(file_path: string){
  return file_path.substring(0, file_path.lastIndexOf("/"));
}

function get_file_type(file_path: string){
  return file_path.substring(file_path.lastIndexOf(".") + 1, file_path.length)
}

function create_folder_if_not_exist(folder_path: string){
  if(! folder_exists(folder_path)){
    Folder.fromPath(output_path + folder_path);
    console.log("folder created", folder_path, folder_exists(folder_path));
  }
}

export default {
  downloads_path,
  output_path,
  get_json,
  write_json,
  get_image,
  get_folder_path,
  write_file,
  get_pm_list,
  file_exists,
  get_file_type,
  folder_exists,
  create_folder_if_not_exist
};
