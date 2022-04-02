import axios from "axios";
import UserService from "services/User";
import { supabase } from "./supabase";

const instance = axios.create({
  withCredentials: true,
});

export default instance;
