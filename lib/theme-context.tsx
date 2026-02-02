"use client";

import * as React from "react";

interface RoleThemeContextType {
  roleTheme: null;
}

const RoleThemeContext = React.createContext<RoleThemeContextType | undefined>(
  undefined
);

export function RoleThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    // Remove any old role-based theme attribute
    document.documentElement.removeAttribute("data-role");
  }, []);

  return (
    <RoleThemeContext.Provider value={{ roleTheme: null }}>
      {children}
    </RoleThemeContext.Provider>
  );
}

export const useRoleTheme = () => {
  const context = React.useContext(RoleThemeContext);
  if (!context) {
    throw new Error("useRoleTheme must be used within a RoleThemeProvider");
  }
  return context;
};
