# Backend
#### Stack:
- Framework backend: Nestjs
- Database : PostgreSql

#### Yêu cầu khi xây dựng boilerplate backend:
- Tổ chức project ( folder, file ... )
- Authenticate ( JWT )
- Authorization (RBAC ). Tìm hiểu các áp dụng casbin lib để authorize
- Tự sinh được CRUD cơ bản
- Tích hợp Authorization vào các service một cách nhanh chóng
- Api document ( Swagger )
### Các vấn đề khi xây dựng crud cơ bản:
- Cần cli generate code from schema
- Có thể populate đến các service khác
- Có thể tạo nhanh record quan hệ. Giả sử Product có category. Khi tạo product có thể gửi dữ liệu catogory để khởi tạo luôn

#### Các vấn đề khi phát triển populate
[Tham khảo Featherjs Populate](https://blog.feathersjs.com/feathers-populate-hooks-a-voyage-from-back-then-to-next-f3f95a0dcf38)


#### Dependency pattern

Các khái niệm đầy đủ về di bắt nguồn từ một thư viện của java provider,consumer,component,connector

https://cungdev.com/gioi-thieu-ve-dagger-2-phan-1/

https://dagger.dev/

#### Generate code
Sửa file .tomg-config sửa phần connect đến database 
Sửa resultsPath
Generate tool sẽ generate module gồm : entity, service, controller,dto. dựa vào bảng có trong cơ sở dữ liệu.
Chạy generate sử dụng lệnh
npm run generate
