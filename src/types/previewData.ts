export interface updatePreviewStatus {
    status?: string | null;
    success?: string | boolean;
    updating?: string | boolean;
}

export interface updatePreviewCommit {
    mergeCommit?: string;
    newPreviewCommit?: string;
    newPreviewCommitMessage?: string;
    newPreviewCommitDate?: string;
}

export interface buildPreview {
    commit_before?: string;
    commit_after: string;
}
