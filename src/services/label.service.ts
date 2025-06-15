import Label, { ILabel } from "../models/label.model";

export interface ILabelService {
    createLabel(label: ILabel): Promise<ILabel>;
    findLabelById(id: string): Promise<ILabel | null>;
    findAllLabels(): Promise<ILabel[]>;
    updateLabel(id: string, label: ILabel): Promise<ILabel | null>;
    deleteLabel(id: string): Promise<ILabel | null>;
}

export class LabelService implements ILabelService {
    constructor(private readonly labelModel: typeof Label) {}

    public async createLabel(label: ILabel): Promise<ILabel> {
        try {
            return await this.labelModel.create(label);
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    public async findLabelById(id: string): Promise<ILabel | null> {
        try {
            const label = await this.labelModel.findById(id);
            if (!label) {
                throw new Error("Label not found");
            }
            return label;
        } catch (error: any) {
            throw new Error(`Finding label by ID failed: ${error.message}`);
        }
    }

    public async findAllLabels(): Promise<ILabel[]> {
        try {
            return await this.labelModel.find();
        } catch (error: any) {
            throw new Error(`Finding all labels failed: ${error.message}`);
        }
    }

    public async updateLabel(id: string, label: ILabel): Promise<ILabel | null> {
        try {
            const updatedLabel = await this.labelModel.findByIdAndUpdate(id, label, { new: true });
            if (!updatedLabel) {
                throw new Error("Label not found");
            }
            return updatedLabel;
        } catch (error: any) {
            throw new Error(`Updating label failed: ${error.message}`);
        }
    }

    public async deleteLabel(id: string): Promise<ILabel | null> {
        try {
            const deletedLabel = await this.labelModel.findByIdAndDelete(id);
            if (!deletedLabel) {
                throw new Error("Label not found");
            }
            return deletedLabel;
        } catch (error: any) {
            throw new Error(`Deleting label failed: ${error.message}`);
        }
    }
}