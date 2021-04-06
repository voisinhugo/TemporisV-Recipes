/* global gapi */
import React from "react";
import { Button } from "../../../../components/Button";

export const GoogleLoginButton = (...props) => (
  <Button onClick={() => gapi.auth2.getAuthInstance().signIn()} {...props}>
    Se connecter
  </Button>
);
