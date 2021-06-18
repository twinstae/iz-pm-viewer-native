import { writable, Writable } from "svelte/store";
import { test_pm_list } from "../constants";

export let pm_list: Writable<MailT[]> = writable(test_pm_list);
