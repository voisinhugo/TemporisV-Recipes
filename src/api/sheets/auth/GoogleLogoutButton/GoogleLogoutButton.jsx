/* global gapi */
import React from "react";
import { Button } from "../../../../components/Button";

export const GoogleLogoutButton = (...props) => (
  <Button onClick={() => gapi.auth2.getAuthInstance().signOut()} {...props}>
    Se déconnecter
  </Button>
);
