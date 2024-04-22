export interface parentData {
    Name: String;
    InCharge?: String;
    Description?: String
}

export interface childData {
    Name: String;
    InCharge?: String;
    Description?: String
}

export interface siblingData {
    Name: String;
    InCharge?: String;
    Description?: String
}

export interface updateBranchData {
    InCharge?: string,
    Description?: string,
    LaunchDate?: string,
    ImplementationDate?: string,
    BuiltStatus?: {
        QaStatus: string,
        ProgressStatus: string
    },
}

export interface branchData {
    Name: string;
    Parent: string;
    InCharge: string | null;
    State: string | null;
    Description: string | null;
    MergeFailCommitMessage: string | null;
    LaunchDate: Date | null;
    ImplementationDate: Date | null;
    PreviewStatus: {
        IsUpdated: boolean;
        IsSuccess: boolean;
        IsUpdating: boolean;
        BuiltStatus: string | null;
    },
    PreviewCommit: {
        MergeCommit: string | null;
        NewPreviewCommit: string | null;
        NewCommitMessage: string | null;
        NewCommitDate: Date | null;
    },
    BuiltStatus: {
        IsBuilt: boolean;
        QaStatus: string | null;
        ProgressStatus: string | null;
    }
}