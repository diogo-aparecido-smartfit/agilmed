import dotenv from "dotenv";
import { BlobServiceClient } from "@azure/storage-blob";

dotenv.config();

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connStr) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING não definida");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

const containerName = "agilmed-bucket";

export const containerClient =
  blobServiceClient.getContainerClient(containerName);
