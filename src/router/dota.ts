import * as express from 'express';
import { getAllTeams } from '../utils/requests';

const router = express.Router();

router.get('/teams', async (_, res) => {
  const teams = await getAllTeams();
  res
    .status(200)
    .send(
      teams.slice(0, 20).map(({ team_id: id, logo_url: logoUrl, name }) => ({
        id,
        logoUrl,
        name
      }))
    );
});

export const dotaRouter = router;
