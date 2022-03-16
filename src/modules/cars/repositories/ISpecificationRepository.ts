interface ICreateSpecificationDTO{
    name: string;
    description:string;
}

interface ISpescificationRepository{
    create({name,description}:ICreateSpecificationDTO):void;
    findByname(name:string);
}

export { ISpescificationRepository, ICreateSpecificationDTO };

