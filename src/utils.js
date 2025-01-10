import React from "react";

export const createRoutes = (routeItems) => {
  if (!routeItems) return []
  const maintenanceRoutes = routeItems[0].items.map(({ menuId, menuDesc, screenAction }) => {
    return { menuId, menuDesc, screenAction, component: React.lazy(() => {/* @vite-ignore */ return import(`./pages/maintenance/${screenAction}`) }) }
  });
  const systemAdminRoutes = routeItems[1].items.map(({ menuId, menuDesc, screenAction }) => {
    return { menuId, menuDesc, screenAction, component: React.lazy(() => {/* @vite-ignore */ return import(`./pages/system-admin/${screenAction}`) }) }
  });
  return [...maintenanceRoutes, ...systemAdminRoutes];
}
// usecase
{/* Dynamic Routes as per user items */ }
{/* {createRoutes().map(({ screenAction, menuDesc, component: Component }) => (
            <Route
              key={screenAction}
              path={`${screenAction}`}
              element={<Component title={menuDesc} />}
            />
          ))} 
*/}

export function convertToTitleCase(input) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export function filterItems(items, criteria) {
  console.log({ criteria });

  const filteredData = items.filter(item => Object.keys(criteria).every(key =>
    String(item[key]).toLowerCase().includes(String(criteria[key]).toLowerCase())
  )
  );

  console.log(filteredData);

  return filteredData;
}