class ApiResponse<T> {
  final String message;
  final bool status;
  final T? data;

  ApiResponse({
    required this.message,
    required this.status,
    this.data,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(Object? json) fromJson) {
    return ApiResponse(
      message: json['message'] as String,
      status: json['status'] as bool,
      data: fromJson(json['data']),
    );
  }

}