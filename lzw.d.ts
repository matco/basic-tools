export const LZW: {
	INITIAL_DICT_SIZE: number;
	MAX_DICT_SIZE: number;
	Compress(string: string, dictionary_max_size?: number): number[];
	CompressToString(string: string): string;
	Decompress(integers: number[], dictionary_max_size?: number): string;
	DecompressString(string: string): string;
};
