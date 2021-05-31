import { firebase } from './firebase'
import { v4 as uuidv4 } from 'uuid'
import store from '../store'
import router from '../router/routes'

const auth: any = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage


// Auth Functions
export const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
}

export const isUserVerified = async () => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    return user ? uuser.emailVerified : false
  })

}

export const sendEmailVerification = (settings: any) => {
  const actionCodeSettings = {
    url: "http://dashboard.logsnap.app/login",
    handleCodeInApp: true,
  };
  auth.currentUser.sendEmailVerification(settings ? settings : actionCodeSettings)
}
// Auth Functions



// Database Functions
export const userDB = db.collection("users");
export const tenantDB = db.collection("tenants");
export const firebaseUploader = (file: any, updateProgress: any) =>
  new Promise((resolve, reject) => {
    const storageReference = firebase.storage().ref("logsnapIssueImages");
    const reference = storageReference.child(
      `${file.name}`
    );
    const uploadTask = reference.put(file);
    store.commit('SET_FILENAME', file.name);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (updateProgress) updateProgress(progress);
      },
      error => {
        console.log("Got error", error);
        return reject(new Error("unable_to_upload"));
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => {
            resolve(url);
            store.commit('SET_FILEURL', url)
          })
          .catch(() => reject(new Error("unable_to_upload")));
      }
    );
  });
export const getTenant = async (id: any) => {
  const tenant = await tenantDB.doc(id).get();
  return tenant.data() ? tenant.data() : "No tenant found in the database"
}

export const createUser = (id: any, user: any) => {
  return userDB.doc(id).set(user)
}


export const getUser = async (id: any) => {
  const user = await userDB.doc(id).get();
  return user.data() ? user.data() : "No user found in the database"
}

export const updateUser = (id: any, user: any) => {
  return userDB.doc(id).update(user)
}

export const deleteUser = (id: any) => {
  return userDB.doc(id).delete()
}


export const createWorkspace = async (workspaceData: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    return isUserDB.collection("workspace").add(workspaceData)
  })
}

export const deleteWorkspace = async (workspacePath: any) => {
  return await getAuthUser().then(user => {
      const uuser: any = user;
      const isUserDB = userDB.doc(uuser.uid);
      return isUserDB.collection("workspace").doc(workspacePath).delete();
  });
};


export const getWorkspace = async () => {
  return await getAuthUser().then(user => {
    const uuser: any = user;
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").onSnapshot(querySnapshot => {
      let workspace: any = [];
      querySnapshot.forEach(doc => {
        workspace.push(doc.data());
        store.commit('SET_WORKSPACE', workspace)
      })
    })
  })
};



export const getAllWorkspace = async () => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").orderBy('name', 'asc').onSnapshot(querySnapshot => {
      let workspaceData: any = []
      querySnapshot.forEach(doc => {
        workspaceData.push(doc.data())
      })
      store.commit('SET_WORKSPACE_DATA', workspaceData)
    })
  })
};



export const createIssue = async (workspacePath: any, issueData: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    return isUserDB.collection("workspace").doc(workspacePath).collection("issues").add(issueData)
  })
};

export const getIssue = async (workspacePath: any, id: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("issues").doc(id).get().then(data => {
      store.commit('SET_ISSUE', data.data())
    })
  })
};

export const updateIssue = async (workspacePath: any, id: any, data: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("issues").doc(id).update(data)
  })
};


export const deleteIssue = async (workspacePath: any, id: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("issues").doc(id).delete()
  })
};

export const getAllIssues = async (workspacePath: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("issues").orderBy('timestamp', 'asc').onSnapshot(querySnapshot => {
      let issuesData: any = []
      querySnapshot.forEach(doc => {
        issuesData.push(doc.data());
      })
      store.commit('SET_ISSUES_DATAS', issuesData)
    })
  })
};



export const createTodo = async (workspacePath: any, todoData: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    return isUserDB.collection("workspace").doc(workspacePath).collection("todos").add(todoData)
  })
};

export const updateTodo = async (workspacePath: any, id: any, data: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("todos").doc(id).update(data)
  })
};

export const deleteTodo = async (workspacePath: any, id: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("todos").doc(id).delete()
  })
};

export const getTodos = async (workspacePath: any) => {
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace").doc(workspacePath).collection("todos").orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
      let todosData: any = []
      querySnapshot.forEach(doc => {
        todosData.push(doc.data());
      })
      store.commit('SET_TODOS', todosData)
    })
  })
};





export const getWorkspacePath = async (path: any) => {
  if(path === undefined) {
    throw new Error ("Path not specified")
  }
  if(path === "") {
    throw new Error ("Path cannot be empty")
  }
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    isUserDB.collection("workspace")
    .doc(path)
    .get()
    .then((doc: any) => {
      if(!doc.exists) {
        store.commit('SET_ERROR_PAGE', true);
      }
    })
  })
};


export const getPath = async (workspacePath: any, path: any, collection: string) => {
  if(workspacePath === undefined || path === undefined && collection === undefined) {
    throw new Error ("Path and Collection must be specified")
  }
  if(workspacePath === undefined) {
    throw new Error ("workspacePath not specified")
  }
  if(path === undefined) {
    throw new Error ("Path not specified")
  }
  if(collection === undefined) {
    throw new Error ("Collection not specified")
  }
  if(workspacePath === "" && path === "" && collection === "") {
    throw new Error ("Path and Collection cannot be empty")
  }
  if(workspacePath === "") {
    throw new Error ("workspacePath cannot be empty")
  }
  if(path === "") {
    throw new Error ("Path cannot be empty")
  }
  if(collection === "") {
    throw new Error ("Collection cannot be empty")
  }
  return await getAuthUser().then(user => {
    const uuser: any = user
    const isUserDB = userDB.doc(uuser.uid)
    switch (collection) {
      case 'Issues':
        isUserDB.collection("workspace")
          .doc(workspacePath)
          .collection("issues")
          .doc(path)
          .get()
          .then((doc: any) => {
            if (!doc.exists) {
              store.commit('SET_ERROR_PAGE', true);
            }
          });
        break;
      case 'Todos':
        isUserDB.collection("workspace")
          .doc(path)
          .collection("todos")
          .get()
          .then((doc: any) => {
            if (!doc.exists) {
               store.commit('SET_ERROR_PAGE', true);
            }
          });
        break;
    }
  })
};

// Database Functions




// Basic Functions
export const generateUID = () => {
  return uuidv4().split("-")[0]
};

export const getPreviousRoute = () => {
  router.beforeEach((to, from) => {
    to
    store.commit('SET_PREVIOUS_ROUTE', from.fullPath)
  })
};

export {
  auth,
  db,
  storage
};