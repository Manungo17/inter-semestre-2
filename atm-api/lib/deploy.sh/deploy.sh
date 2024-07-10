#!/bin/bash

# Construir la aplicación
sam build

# Implementar la aplicación
sam deploy --guided
