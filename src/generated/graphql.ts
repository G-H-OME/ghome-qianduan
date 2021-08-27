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
  noPhoneLogin: UserResponse;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationNoPhoneLoginArgs = {
  options: PhonePasswordInput;
};

export type PhonePasswordInput = {
  phone: Scalars['String'];
  password: Scalars['String'];
};

export type Post = MongoClass & {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  creator: User;
  posts: User;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
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
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename: 'Post', id: string, createdAt: string, updatedAt: string, title: string }> };


export const PostsDocument = gql`
    query Posts {
  posts {
    id
    createdAt
    updatedAt
    title
    __typename
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};