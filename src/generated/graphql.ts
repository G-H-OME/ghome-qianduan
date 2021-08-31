import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MongoClass = {
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  sendToken: UserResponse;
  noPhoneLogin: UserResponse;
  phoneLoginOrRegister: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationSendTokenArgs = {
  phone: Scalars['String'];
};


export type MutationNoPhoneLoginArgs = {
  options: PhonePasswordInput;
};


export type MutationPhoneLoginOrRegisterArgs = {
  password?: Maybe<Scalars['String']>;
  options: PhoneTokenInput;
};

export type PhonePasswordInput = {
  phone: Scalars['String'];
  password: Scalars['String'];
};

export type PhoneTokenInput = {
  phone: Scalars['String'];
  token: Scalars['String'];
};

export type Post = MongoClass & {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  creator: User;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type User = MongoClass & {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
  balance: Scalars['Float'];
  posts: Array<Post>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'Post', id: string, creator: { __typename?: 'User', id: string } }> };

export type NoPhoneLoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type NoPhoneLoginMutation = { __typename?: 'Mutation', noPhoneLogin: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, phone: string }> } };

export type PhoneLoginOrRegisterMutationVariables = Exact<{
  phone: Scalars['String'];
  token: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type PhoneLoginOrRegisterMutation = { __typename?: 'Mutation', phoneLoginOrRegister: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: string, phone: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type SendTokenMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendTokenMutation = { __typename?: 'Mutation', sendToken: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, phone: string }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, creator: { __typename?: 'User', id: string, phone: string } }> };


export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!) {
  createPost(title: $title) {
    id
    creator {
      id
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const NoPhoneLoginDocument = gql`
    mutation NoPhoneLogin($phone: String!, $password: String!) {
  noPhoneLogin(options: {phone: $phone, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      phone
    }
  }
}
    `;

export function useNoPhoneLoginMutation() {
  return Urql.useMutation<NoPhoneLoginMutation, NoPhoneLoginMutationVariables>(NoPhoneLoginDocument);
};
export const PhoneLoginOrRegisterDocument = gql`
    mutation PhoneLoginOrRegister($phone: String!, $token: String!, $password: String) {
  phoneLoginOrRegister(
    options: {phone: $phone, token: $token}
    password: $password
  ) {
    user {
      id
      phone
    }
    errors {
      field
      message
    }
  }
}
    `;

export function usePhoneLoginOrRegisterMutation() {
  return Urql.useMutation<PhoneLoginOrRegisterMutation, PhoneLoginOrRegisterMutationVariables>(PhoneLoginOrRegisterDocument);
};
export const SendTokenDocument = gql`
    mutation SendToken($phone: String!) {
  sendToken(phone: $phone) {
    errors {
      field
      message
    }
  }
}
    `;

export function useSendTokenMutation() {
  return Urql.useMutation<SendTokenMutation, SendTokenMutationVariables>(SendTokenDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    phone
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
    creator {
      id
      phone
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};