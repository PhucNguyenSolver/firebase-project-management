import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from 'services/persistent'


export default function useRealtimeCollection(collectionPath, wheres = [], customConverter = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = query(collection(db, collectionPath));
    q = customConverter ? q.withConverter(customConverter) : q
    wheres.forEach((w) => { q = query(q, w) })
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.info('onSnapshot')
      const documents = querySnapshot.docs.map(res => res.data())
      setData(documents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionPath]);

  return [data, loading];
}
