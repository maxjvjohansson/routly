-- Routly — optional demo data
--
-- Explore, the filters and the "Near me" sort are all hard to judge against
-- an empty table. This script gives you a few routes to look at.
--
-- It needs a user to own the routes, and only Supabase Auth can create one,
-- so: sign up in the app first, then run this file. If no user exists yet it
-- prints a notice and changes nothing. That is also why `supabase db reset`
-- runs it to no effect — reset wipes auth.users too.
--
-- Routes are attached to the most recently created account and are safe to
-- re-run: existing demo rows are replaced, your own saved routes are left
-- alone.

do $$
declare
  demo_user uuid;
begin
  select id into demo_user
  from auth.users
  order by created_at desc
  limit 1;

  if demo_user is null then
    raise notice 'No user in auth.users — sign up in the app first, then re-run this file.';
    return;
  end if;

  delete from public.routes
  where user_id = demo_user and name like '[demo]%';

  -- Two roundtrips and one point-to-point, spread across Göteborg and
  -- Stockholm so the "Near me" sort has something to order. The coordinate
  -- arrays are deliberately short — enough to draw a line on the map, not
  -- real ORS output.
  insert into public.routes (
    user_id, name, activity, distance_km, elevation_gain, duration_estimate,
    coordinates, start_lat, start_lng, end_lat, end_lng, is_roundtrip
  ) values
  (
    demo_user, '[demo] Slottsskogen loop', 'run', 5.2, 48, 31,
    '[{"lat":57.6839,"lng":11.9463,"elevation":12},
      {"lat":57.6862,"lng":11.9401,"elevation":24},
      {"lat":57.6901,"lng":11.9438,"elevation":38},
      {"lat":57.6878,"lng":11.9502,"elevation":19},
      {"lat":57.6839,"lng":11.9463,"elevation":12}]'::jsonb,
    57.6839, 11.9463, 57.6839, 11.9463, true
  ),
  (
    demo_user, '[demo] Delsjön gravel', 'cycle', 24.7, 310, 68,
    '[{"lat":57.6934,"lng":12.0402,"elevation":45},
      {"lat":57.6988,"lng":12.0521,"elevation":78},
      {"lat":57.7042,"lng":12.0689,"elevation":112},
      {"lat":57.6975,"lng":12.0603,"elevation":66},
      {"lat":57.6934,"lng":12.0402,"elevation":45}]'::jsonb,
    57.6934, 12.0402, 57.6934, 12.0402, true
  ),
  (
    demo_user, '[demo] Djurgården point-to-point', 'run', 8.9, 71, 52,
    '[{"lat":59.3251,"lng":18.0894,"elevation":8},
      {"lat":59.3268,"lng":18.1032,"elevation":22},
      {"lat":59.3287,"lng":18.1201,"elevation":31},
      {"lat":59.3302,"lng":18.1388,"elevation":14}]'::jsonb,
    59.3251, 18.0894, 59.3302, 18.1388, false
  );

  raise notice 'Inserted 3 demo routes for user %', demo_user;
end $$;
