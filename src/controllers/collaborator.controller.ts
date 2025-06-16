import { Request, Response } from "express";
import { ICollaboratorService } from "../services/collaborator.service";
import { ApiError } from "../errors/error.handler";

export interface ICollaboratorController {
    createCollaborator(req: Request, res: Response): Promise<void>;
    findCollaboratorById(req: Request, res: Response): Promise<void>;
    findAllCollaborators(req: Request, res: Response): Promise<void>;
    updateCollaborator(req: Request, res: Response): Promise<void>;
    deleteCollaborator(req: Request, res: Response): Promise<void>;
}

export class CollaboratorController implements ICollaboratorController{
    constructor(private readonly collaboratorService: ICollaboratorService){}

    createCollaborator = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, boardId } = req.body;
            
            if (!userId || !boardId) {
                throw ApiError.badRequest('Missing required fields', 'Please provide userId and boardId');
            }

            const collaborator = await this.collaboratorService.createCollaborator(req.body);
            res.status(201).json(collaborator);
        } catch (error: any) {
            throw error;
        }
    }

    findCollaboratorById = async (req: Request, res: Response): Promise<void> => {
        try {
            const collaborator = await this.collaboratorService.findCollaboratorById(req.params.id);
            if (!collaborator) {
                throw ApiError.notFound('Collaborator not found');
            }
            res.status(200).json(collaborator);
        } catch (error: any) {
            throw error;
        }
    }

    findAllCollaborators = async (req: Request, res: Response): Promise<void> => {
        try {
            const collaborators = await this.collaboratorService.findAllCollaborators();
            res.status(200).json(collaborators);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateCollaborator = async (req: Request, res: Response): Promise<void> => {
        try {
            const collaborator = await this.collaboratorService.updateCollaborator(req.params.id, req.body);
            if (!collaborator) {
                throw ApiError.notFound('Collaborator not found');
            }
            res.status(200).json(collaborator);
        } catch (error: any) {
            throw error;
        }
    }

    deleteCollaborator = async (req: Request, res: Response): Promise<void> => {
        try {
            const collaborator = await this.collaboratorService.deleteCollaborator(req.params.id);
            if (!collaborator) {
                throw ApiError.notFound('Collaborator not found');
            }
            res.status(200).json(collaborator);
        } catch (error: any) {
            throw error;
        }
    }
}