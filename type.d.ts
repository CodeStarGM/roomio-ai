interface AuthState {
  isSignedIn:boolean,
  username: string | null,
  userId:string | null
}

interface AuthContext {
   isSignedIn:boolean,
  username: string | null,
  userId:string | null,
  refreshAuth:  () => Promise<bolean>;
   signIn:  () => Promise<bolean>;
    signOut:  () => Promise<bolean>;
}