import { ICollaborator, ICollaboratorResponse } from "../interfaces/collaborator.interface";
import Collaborator from "../models/collaborator.model";

export interface ICollaboratorService {
    createCollaborator(collaborator: ICollaborator): Promise<ICollaboratorResponse>;
    findCollaboratorById(id: string): Promise<ICollaboratorResponse | null>;
    findAllCollaborators(): Promise<ICollaboratorResponse[]>;
    updateCollaborator(id: string, collaborator: ICollaborator): Promise<ICollaboratorResponse | null>;
    deleteCollaborator(id: string): Promise<ICollaboratorResponse | null>;
}

export class CollaboratorService implements ICollaboratorService {
    constructor(private readonly collaboratorModel: typeof Collaborator) {}

    createCollaborator = async (collaborator: ICollaborator): Promise<ICollaboratorResponse> => {
        try {
            const newCollaborator = await this.collaboratorModel.create(collaborator);
            return {
                id: newCollaborator._id,
                user: newCollaborator.user,
                board: newCollaborator.board,
                role: newCollaborator.role,
            };
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    findCollaboratorById = async (id: string): Promise<ICollaboratorResponse | null> => {
        try {
            const collaborator = await this.collaboratorModel.findById(id).populate("user", "name").populate("board", "name");
            if (!collaborator) {
                throw new Error("Collaborator not found");
            }
            return {
                id: collaborator._id,
                user: collaborator.user,
                board: collaborator.board,
                role: collaborator.role,
            };
        } catch (error: any) {
            throw new Error(`Finding collaborator by ID failed: ${error.message}`);
        }
    }

    findAllCollaborators = async (): Promise<ICollaboratorResponse[]> => {
        try {
            const collaborators = await this.collaboratorModel.find().populate("user", "name").populate("board", "name");
            return collaborators.map((collaborator: ICollaborator) => ({
                id: collaborator._id,
                user: collaborator.user,
                board: collaborator.board,
                role: collaborator.role,
            })) as ICollaboratorResponse[];
        } catch (error: any) {
            throw new Error(`Finding all collaborators failed: ${error.message}`);
        }
    }

    updateCollaborator = async (id: string, collaborator: ICollaborator): Promise<ICollaboratorResponse | null> => {
        try {
            const updatedCollaborator = await this.collaboratorModel.findByIdAndUpdate(id, collaborator, { new: true }).populate("user", "name").populate("board", "name");
            if (!updatedCollaborator) {
                throw new Error("Collaborator not found");
            }
            return {
                id: updatedCollaborator._id,
                user: updatedCollaborator.user,
                board: updatedCollaborator.board,
                role: updatedCollaborator.role,
            };
        } catch (error: any) {
            throw new Error(`Updating collaborator failed: ${error.message}`);
        }
    }

    deleteCollaborator = async (id: string): Promise<ICollaboratorResponse | null> => {
        try {
            const deletedCollaborator = await this.collaboratorModel.findByIdAndDelete(id).populate("user", "name").populate("board", "name");
            if (!deletedCollaborator) {
                throw new Error("Collaborator not found");
            }
            return {
                id: deletedCollaborator._id,
                user: deletedCollaborator.user,
                board: deletedCollaborator.board,
                role: deletedCollaborator.role,
            };
        } catch (error: any) {
            throw new Error(`Deleting collaborator failed: ${error.message}`);
        }
    }
}