import { getRandomName } from '../src/utils';
import WorkspaceService, { WorkspaceDTO } from '../src/services/workspace.service';

describe('WorkspaceService', () => {
  let ws = new WorkspaceService();

  describe('create', () => {
    it('should not create if existed (throw)', async () => {
      let oldOne = new WorkspaceDTO(getRandomName(), 'phucId', ['phucId'], ['col1'])
      await ws.create(oldOne)
      await expect(ws.create(oldOne)).rejects.toThrow()
    })

    it('create and get by id', async () => {
      let newOne = new WorkspaceDTO(getRandomName(), 'phucId', ['phucId'], ['col1'])
      let id = await ws.create(newOne)

      let result = await ws.getById(id)
      expect(result.name).toEqual(newOne.name)
      expect(result.owner).toEqual(newOne.owner)
      expect(result.columns).toEqual(newOne.columns)
      expect(result.members).toEqual(newOne.members)
    });

  });

  describe('getWorkspace', () => {

    it('should throw if workspace is not found', async () => {
      const workspaceId = 'non-existing-workspace-id';
      await expect(ws.getById(workspaceId)).rejects.toThrow()
    });

    it('given a member, list his workspaces', async () => {
      const memberId = 'phucId'
      const result = await ws.getByMemberId(memberId)
      expect(result.length).toBeGreaterThan(0)
    });
  });

});
