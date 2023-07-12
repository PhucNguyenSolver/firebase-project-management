import useRealtimeCollection from 'hook/useRealtimeCollection';
import { serverTimestamp, where } from 'firebase/firestore';
import { WorkspaceDTO } from 'services/workspace.service';


const workspaceConverter = {
  toFirestore: (ws) => {
    return {
      name: ws.name,
      createdById: ws.owner,
      columnIdList: ws.columns,
      memberIdList: ws.members,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    // console.log({ snapshot, data })
    return new WorkspaceDTO(
      data.name,
      data.createdById,
      data.memberIdList,
      data.columnIdList,
    )
      .withId(snapshot.id)
  },
};

export default function useWorkspaceCollection(userId) {
  const [workspaces, loading] = useRealtimeCollection('workspace', [
    where('memberIdList', 'array-contains', userId)
  ], workspaceConverter)

  console.log({ workspaces })
  return [workspaces, loading]
}