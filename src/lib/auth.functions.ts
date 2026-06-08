import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

export const makeLegacyAccountLoginReady = createServerFn({ method: "POST" })
  .inputValidator((input) => emailSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const targetEmail = data.email.trim().toLowerCase();
    let page = 1;

    while (page <= 20) {
      const { data: usersPage, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: 100,
      });
      if (error) return { checked: false };

      const user = usersPage.users.find((item) => item.email?.toLowerCase() === targetEmail);
      if (user) {
        if (!user.email_confirmed_at && !user.confirmed_at) {
          await supabaseAdmin.auth.admin.updateUserById(user.id, { email_confirm: true });
        }
        return { checked: true };
      }

      if (usersPage.users.length < 100) break;
      page += 1;
    }

    return { checked: true };
  });