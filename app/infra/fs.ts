import { knownFolders, File } from "@nativescript/core/file-system";
import {get_member_name} from "~/constants";
// let downloads_path = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
// export const output_path = downloads_path + "/.izpm-viewer/output";

const downloads_path = "/storage/emulated/0/Download/.izpm-viewer";

const output_path = downloads_path + "/output"; // knownFolders.documents().path

async function get_json(file_path: string){
  const raw_text = File.fromPath(output_path + file_path).readTextSync();

  return JSON.parse(raw_text);
}

async function write_json(file_path: string, data: any){
  const json = JSON.stringify(data);

  File.fromPath(output_path + file_path).writeText(json)
}

async function get_pm_list(): Promise<MailT[]>{
  return get_json("/pm_list.json").then((v: MailT[])=>{
    return v.map((pm)=>({
      ...pm,
      member: get_member_name(pm.member)
    }))
  });
}

function file_exists(path: string){
  return File.exists(output_path + path);
}

export default {
  downloads_path,
  output_path,
  get_json,
  write_json,
  get_pm_list,
  file_exists,
};
