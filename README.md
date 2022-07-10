# rocketseat-reactjs-chapter5

## Creating a new nextjs project

Run the command `yarn create next-app {project_name}`.

Clean up the bootstrapped application (refer to commit) and add typescript dependencies `yarn add -D typescript @types/react @types/node`.

To run the project, execute the command `yarn dev`.

### Installing Chakra UI to enable development with Declarative Interfaces

`yarn add @chakra-ui/react @chakra-ui/core @emotion/react @emotion/styled framer-motion`

Chakra UI uses emotion under the hood to provide its features. Emotion is a css in js framework somewhat similar to styled components.

Chakra uses framer-motion to provider animation capabilities.

### Charts on React

Apex charts is a lib that not only does provide nice looking charts but also has great integration with react.

`yarn add apexcharts react-apexcharts`


### React Query

React query is a lib that enables data synchronization, caching and update. It helps to improve performance dramatically 
by allowing data to be stored on the frontend to prevent having to fetch it unnecessarily again and when it should be refreshed
in a very simple and handy (but yet very customisable and powerful) way.

React Query makes use of the Stale While Revalidate (SWR) concept. Where it balances between immediacy (showing the cached data straightaway) and data freshness.
In a nutshell, SWR displays Stale data While it is being Revalidated (or updated).

Default behaviour:

1. When a user navigates from page `a` to `b` and back to `a`. The first time page `a` is accessed the data will be fetched from the server. In the second, the cached data will be immediately rendered and a revalidation cycle triggered.
Should something has been changed, the ui will be reloaded.
2. When a user changes to another tab or window and comes back to the previously open page, react query also triggers a revalidation cycle (formally called revalidate on focus). It is particularly useful for users who pin tabs or leave the page open for a log time.


`yarn add react-query`.

*Configuration:*

The first step is to set up the react query provider (like chakra provider, context providers, etc). It has to wrap the whole application:

```

const queryClient = new QueryClient()
...

    <QueryClientProvider client={queryClient}>
    ...
    </QueryClientProvider>

```

*Use:*

Then it is just a matter of using the hook in order to start fetching data with caching and refreshing capabilities:

```
    // cache-key is the key that will be used to save the response in the localstorage
    const query = useQuery('{cache-key}', async () => {
        // any http client can be used here.
        const response = await fetch('endpoint')
        const data = await response.json();
        return data;
    });

    // Example
    const query = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json();
        return data;
    })
```


*React Query Dev Tools:*

React Query Dev tools helps application debugging and provides a nice admin console that allow data management (refetch, invalidate, reset, remove, etc) and visualization. 

To use it, just import the component ReactQueryDevtools and add it anywhere inside the QueryClientProvider - don't forget to remove before deploying to production.

```
import { ReactQueryDevtools } from 'react-query/devtools'
...
    <QueryClientProvider client={queryClient}>
    ...
      <ReactQueryDevtools />
    </QueryClientProvider>

```

By default, react query assumes that all data is obsolete since fetching, thus needs refetching in one of the cases described above. To make react query consider data as fresh,
it is necessary to set up how long it is considered to be fresh by providing an extra parameter when creating the query:

```
    const query = useQuery('{cache-key}', async () => {
        // any http client can be used here.
        const response = await fetch('endpoint')
        const data = await response.json();
        return data;
    }, 
    {staleTime: 1000 * 5}); // in milliseconds
```


### Initial Load vs Stale Reload

It is important that Apps using the Stale While Revalidate concept have two distinct visual feedback for both types of data fetching - initial load and stale reload.


### Pagination

When working with pagination, it is important to create a query key that represents that unique page. React query is quite flexible with the key definition and supports dynamic string (using template string for instance), complex object (like an array or object), etc.


### Data prefetch


### Mutations

Mutations are actions that create, update or delete data on the api.

The advantage of using react query mutations over raw fetches (or even axios) is that it provides out of the box retry mechanism, similar api to query where there are plenty of useful information like 
request state and the hability to conveniently invalidate previously related cached data - check commit.

*It is also possible to update cached data instead of invalidating them*


### SSR

By default, react query and hooks only work on the client side. In order to use leverage SSR and react query, it is necessary to (1) prefetch the data on the server side without
react query and (2) on the client side when the data is about to be loaded, provide it to react query as `initialData`.

1. prefetch data on the server side with `GetServerSideProps`.
2. when rendering on the client side, provide the data straightaway using the `initialData` property (do so via `UseQueryOptions` type).

See commit for more details.