import { File } from '@nativescript/core/file-system';

const downloads_path = "/storage/emulated/0/Download";

export const output_path = downloads_path + "/.izpm-viewer/output";
export const get_json = (file_path: string) => {
  const raw_text = File.fromPath(output_path + file_path).readTextSync()

  return JSON.parse(raw_text)
}
