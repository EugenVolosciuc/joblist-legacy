import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "config/supabase";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (req: NextApiRequest, res: NextApiResponse) => any
) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return await callback(req, res);
  }

  return res.status(401).json({ message: "Not authenticated" });
};
