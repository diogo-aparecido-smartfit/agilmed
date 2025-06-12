import { Router } from "express";
import { ControllerFactory } from "../di/factories/controller.factory";

const medicalCentersRouter = Router();
const placesController = ControllerFactory.createMedicalCentersController();

/**
 * @openapi
 * /api/medical-centers:
 *   get:
 *     summary: Retorna centros médicos próximos
 *     tags:
 *       - Centros Médicos
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         description: Latitude da localização atual
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         description: Longitude da localização atual
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Raio de busca em metros (opcional, padrão 5000)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Tipo de estabelecimento (hospital, pharmacy, etc.)
 *     responses:
 *       200:
 *         description: Lista de centros médicos próximos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nome do centro médico
 *                   address:
 *                     type: string
 *                     description: Endereço do centro médico
 *                   location:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         description: Latitude
 *                       lng:
 *                         type: number
 *                         description: Longitude
 *                   distance:
 *                     type: number
 *                     description: Distância em metros
 *                   rating:
 *                     type: number
 *                     description: Avaliação média (0-5)
 *       400:
 *         description: Parâmetros de localização ausentes ou inválidos
 *       500:
 *         description: Erro ao buscar centros médicos
 */
medicalCentersRouter.get(
  "/",
  placesController.getNearbyPlaces.bind(placesController)
);

export default medicalCentersRouter;
